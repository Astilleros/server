const { createModel } = require('mongoose-gridfs');
const objMimeTypes = require('mime-types')

import type mongoose from 'mongoose';
import fs from 'fs';
import {initFSDirectory} from '../models/FSDirectory.model'
import {initFSFile} from '../models/FSFile.model'

export class mngGFS {
    
    /**
     *  Class constructor - Create an object and set arrParams atribute (with dependency ingection atributes object).
     *
     *  @param arrParams: any - Javascript object with all dependency reference objects.
     */
    constructor( private $: any ) {
        createModel({
            modelName: 'GridFSFile',
            connection: this.$.db.connection
        });
        initFSDirectory($);
        initFSFile($);

    }
    

    //  #####################################################
    //  #####################################################
  
    /**
     *  getExplodedPath method - This method is called to get an array of path directories parts.
     *
     *    @param String - strPath Path to separate into directory array.
     *
     *    @return any - Returns an array of path directories parts.
     */
    getExplodedPath( strPath: string ): any {   
        let arrLstPathParts = strPath.split("/");
      
        for( let posPathPart in arrLstPathParts )
        for( let posPathPart in arrLstPathParts ) {
            if( arrLstPathParts[ posPathPart ] == "" )
                arrLstPathParts.splice( parseInt(posPathPart), 1 );
        }
      
        return arrLstPathParts;
    }
  

    /**
     *  getImplodedPath method - This method is called to get an string with path from array path directories parts.
     *
     *    @param any - arrPathParts Array of path directories parts.
     *
     *    @return String - Returns an String with imploded path from array of path directories parts.
     */
    getImplodedPath( arrPathParts: string[] ): string {
        return "/"+( arrPathParts.join("/") );
    }
  
    /**
     *  getFileNameFromPath method - This method is called to get an string with file name. (Last part of path)
     *
     *    @param String - strPath Path to get file name
     *
     *    @return String - Returns an String with file name. (Last part of path)
     */
    getFileNameFromPath( strPath: string ): string {     //    OK
        let arrPartsPath = this.getExplodedPath( strPath );
      
        return arrPartsPath[ arrPartsPath.length - 1 ];
    }

  
    /**
     *  getParentPath method - This method is called to get an string with parent path. (Path without last part of path)
     *
     *    @param String - strPath Path to get parent path.
     *
     *    @return String - Returns an String with parent path. (Path without last part of path)
     */
    getParentPath( strPath: string ): string {     //    OK
        let arrPartsPath = this.getExplodedPath( strPath );
      
        return this.getImplodedPath( arrPartsPath.slice(0, -1) );
    }


    /**
     *  getDirFromPath method - This method is called to get Directory Mongodb object / register from path.
     *
     *    @param String - strPath Path to get directory object / register.
     *
     *    @return any - Returns an object with directory object / register.
     */
    async getDirFromPath( strPath: string, blCreatePath: boolean = false ): Promise<any> {     //    OK
        let tadFSDirectory = this.$.db.models.FSDirectory;
      
      
        let refParentDir: any = null;
        
        let arrDirToRet: any = null;
      
        let arrLstPathParts = this.getExplodedPath( strPath );
      
        for( let posPathPart in arrLstPathParts ) {
            const strPartPath = arrLstPathParts[ posPathPart ];
            
            const objPreDir = await tadFSDirectory.findOne({
                refParentDir: refParentDir,
                strName: strPartPath
            });

            if( objPreDir !== null ) {      //  Sub-directory exists
                refParentDir = objPreDir._id;
                arrDirToRet = objPreDir;
            } else {                        //  Sub-directory didn't exists
                if( blCreatePath ) {
                  
                    let objNewDir = await tadFSDirectory.create({
                        refParentDir: refParentDir,
                        strName: strPartPath
                    });

                    refParentDir = objNewDir._id;
                    arrDirToRet = objNewDir;
                } else {
                    throw Error('SystemFS_ErrPathNotExists');
                }
            }
        }
        
        return arrDirToRet;
    }


    //  --------------------------------

  
    /**
     *  addFile method - This method is called to add one file to GridFS File System.
     *
     *    @param String - strDirPath Remote path to save file in MongoDB FS.
     *    @param String - strLocalFilePath Local file path to save in MongoDB FS.
     *    @param String - blCreatePath Boolean parameter to specify path auto-creation when it dont exist.
     */
    async addFile( strDirPath: string, strLocalFilePath: string, blCreatePath: boolean = false ): Promise<any> {     //    OK
        let tadFSFile = this.$.db.models.FSFile;
      
        let objModelGridFSFile = this.$.db.models.GridFSFile;
        let objParentDir = await this.getDirFromPath( strDirPath, blCreatePath );
      
        let strFileName = this.getFileNameFromPath( strLocalFilePath );
        let strMimeType = objMimeTypes.lookup( strFileName );
      
        // ---- Test file with same name in folder doesn't exists -----
        // ------------------------------------------------------------
        let objFSFile = await tadFSFile.findOne({
            refParentDir: objParentDir._id,
            strName: strFileName
        });
        if( objFSFile != null )
            throw Error('SystemFS_ErrFileExists');
        // ------------------------------------------------------------

        // ---- Create new file in folder with name specified -----
        // --------------------------------------------------------
        const readStream = fs.createReadStream( strLocalFilePath );
     
        return new Promise( async (resolve, reject) => {
          
            await objModelGridFSFile.write( {
                filename: strFileName,
                contentType: strMimeType,
            }, readStream, async (error: any, objFile: any) => {
                let objNewFSFile = new tadFSFile({
                    strName: strFileName,
                    strContentType: strMimeType,
                    refParentDir: objParentDir._id,
                    refGridFSFile: objFile._id,
                });
                await objNewFSFile.save();
              
                resolve( objFile );
            } );
        } );

       // --------------------------------------------------------
    }
  
  
    /**
     *  mvFile method - This method is called to move file in FS.
     *
     *    @param String - strPathIni Mongo init dir path to remove file.
     *    @param String - strPathEnd Mongo end dir path to save File.
     *    @param String - blCreatePath Boolean parameter to specify path auto-creation if not exists end path.
     */
    async mvFile( strFilePathIni: string, strFolderPathEnd: string, blCreatePath: boolean = false): Promise<any>{
        let tadFSFile = this.$.db.models.FSFile;
      
        let strIniParentPath = this.getParentPath(strFilePathIni);
        let objIniParentPath = await this.getDirFromPath( strIniParentPath, false );
        let strIniFileName = this.getFileNameFromPath( strFilePathIni );
      
      
        let objEndParentPath = await this.getDirFromPath( strFolderPathEnd, blCreatePath );
      
        // ---- Test file with same name in end folder doesn't exists -----
        // ------------------------------------------------------------
        let objFSFile = await tadFSFile.findOne({
            refParentDir: objEndParentPath._id,
            strName: strIniFileName
        });
        if( objFSFile != null )
            throw Error('SystemFS_ErrFileExists');
        // ------------------------------------------------------------

        // ---- Change father reference -----
        // --------------------------------------------------------
        
        return await tadFSFile.findOneAndUpdate({
                refParentDir: objIniParentPath._id,
                strName: strIniFileName
            },
            {
                refParentDir: objEndParentPath._id,
                strName: strIniFileName
            });
      
    }
  
    /**
     *  getFileStream method - This method is called to get file Stream from MongoDB GridFS.
     *
     *    @param String - strRemotePath Path to get MongoDB GridFS File Stream.
     *
     *    @return any - Returns stream of file.
     */
    async getFileStream( strRemotePath: string ): Promise<any> {
        let objModelGridFSFile = this.$.db.models.GridFSFile;
        let strDirName = this.getFileNameFromPath( strRemotePath );
        let strParentPath = this.getParentPath( strRemotePath );
        let objParentDir = await this.getDirFromPath( strParentPath, false );
        let tadFSFile = this.$.db.models.FSFile;
        //---
        let objFSFile = await tadFSFile.findOne({ refParentDir: objParentDir._id, strName: strDirName  });
        
        return await objModelGridFSFile.read({ _id: objFSFile.refGridFSFile });
    }
  
  
    /**
     *  getFileToString method - This method is called to get file Stream from MongoDB GridFS.
     *
     *    @param String - strRemotePath Path to get MongoDB GridFS File Stream.
     *
     *    @return String - Returns file content.
     */
    async getFileToString( strRemotePath: string): Promise<string> {
        let objReadStream = await this.getFileStream( strRemotePath );
      
        const chunks : any[] = [];
        return await new Promise((resolve, reject) => {
            objReadStream.on('data', (chunk : any) => chunks.push(chunk));
            objReadStream.on('error', reject);
            objReadStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        });
    }
  
  
    /**
     *  getFileToLocal method - This method is called to get file to local file system.
     *
     *    @param String - strRemotePath Path of MongoDB GridFS File Stream.
     *    @param String - strLocalPath Path of local file system to save file.
     */
    async getFileToLocal( strRemotePath: string, strLocalPath: string ) : Promise<void> {
        
        let objReadStream = await this.getFileStream( strRemotePath );
      
        let objWriteStream = await fs.createWriteStream( strLocalPath );
      
        await objReadStream.pipe( objWriteStream );
    }

  
    /**
     *  rmFile method - This method is called to remove GridFS file in server from path.
     *
     *    @param String - strPath Path to remove GridFS file in server.
     */
    async rmFile( strPath: string ): Promise<void> {
        let objMongoose = this.$.db
        let objModelGridFS = this.$.db.models.GridFS;
      
        let tadFSFile = this.$.db.models.FSFile;
      
        let strFileName = this.getFileNameFromPath( strPath );
        let strParentPath = this.getParentPath( strPath );
      
        let objParentDir = await this.getDirFromPath( strParentPath, false );
        await tadFSFile.deleteOne({
            refParentDir: objParentDir._id,
            strName: strFileName
        });
    }
  
    //  --------------------------------
  
    /**
     *  mkdir method - This method is called to create directory.
     *
     *    @param String - strDirPath Remote path to save file in MongoDB FS.
     *    @param String - blCreatePath Boolean parameter to specify path auto-creation if not exists path.
     */
    async mkdir( strPath: string, blRecursive: boolean = false ): Promise<any> {
        let tadFSDirectory = this.$.db.models.FSDirectory;
        let arrNewDir: any;
      
        let strFileName = this.getFileNameFromPath( strPath );
        let strParentPath = this.getParentPath( strPath );
      
        if( blRecursive ) {
         
            arrNewDir = await this.getDirFromPath( strPath, true );
          
        } else {
          
            let arrParentDir = await this.getDirFromPath( strParentPath, false );
          
            let objNewDir = await tadFSDirectory.create({
                refParentDir: arrParentDir._id,
                strName: strFileName
            });
          
            arrNewDir = objNewDir;
        }
      
        return arrNewDir;
    }
  
  
    /**
     *  rmdir method - This method is called to delete directory and child directories and files.
     *
     *    @param String - strDirPath Remote path to save file in MongoDB FS.
     */
    async rmdir( strPath: string ): Promise<void> {
        let objDirToRemove = await this.getDirFromPath( strPath, true );
        await objDirToRemove.remove({ _id: objDirToRemove._id });
    }
  
  
    //  --------------------------------
  
  
    /**
     *  getDirContent method - This method is called to get Directory contents.
     *
     *    @param String - strPath Path to get directory object / register.
     *
     *    @return any - Returns an object with directory contents (Files and directories).
     */
    async getDirContent( strPath: string ): Promise<any> {     //    OK
        let objMongoose = this.$.db
        let objModelGridFS = this.$.db.models.GridFSFile;
      
        let tadFSFile = this.$.db.models.FSFile;
        let tadFSDirectory = this.$.db.models.FSDirectory;
      
        let objParentDir = await this.getDirFromPath( strPath, false );
        let arrLstFSFiles = await tadFSFile.find({
            refParentDir: objParentDir._id,
        });
        let arrLstFSDirectory = await tadFSDirectory.find({
            refParentDir: objParentDir._id,
        });
      
        return {
            arrLstDirectories: arrLstFSDirectory,
            arrLstFiles: arrLstFSFiles,
        };
    }
  
  
    /**
     *  getDirTree method - This method is called to get Directory contents recursively.
     *
     *    @param String - strPath Path to get directory object / register.
     *
     *    ```
     *        Fichero:
     *        { 
     *           "value":"gear.jpg",
     *           "id":"/gear.jpg",
     *           "size":41574,
     *           "date":1580383973.713,
     *           "type":"image"
     *        },
     *
     *
     *       Directorio:
     *       { 
     *          "value":"Files",
     *          "id":"/",
     *          "size":4096,
     *          "date":1580831892.663,
     *          "data":[ 
     *              .....
     *          ],
     *          "type":"folder",
     *          "open":true
     *       }
     *    ```
     *
     *    @return any - Returns an object with directory contents (Files and directories) recursively.
     */
    async getDirTree( strPath: string ): Promise<any> {
      
        let arrDir: any[] = [];
        let arrFil: any[] = [];
      
        let strDirName = this.getFileNameFromPath( strPath );
     
        let arrLstContent = await this.getDirContent( strPath );
      
        for ( let arrElemDir of arrLstContent.arrLstDirectories ) {

            let strChildDirName = arrElemDir.strName;
            let strChildPath = strPath + "/" + strChildDirName;
          
            const arrChildDir = await this.getDirTree( strChildPath );
            arrDir.push( arrChildDir );
        }
      
        for( let arrElemFile of arrLstContent.arrLstFiles ) {
            arrFil.push( arrElemFile );
        }
        
        return { 
            name: strDirName,
            child_folders: arrDir,
            child_files: arrFil
        };
    }

        //pruebas
    async pruebas() {
            console.log("Start main moduleToTest");
            console.log("Path op.");
            let ruta = "/Dir1/Dir2/Dir3/file.txt";
            console.log( ruta );
            let ruta_exp = this.$.gfs.getExplodedPath( ruta );
            console.log( ruta_exp );
            console.log( this.$.gfs.getImplodedPath( ruta_exp ));
            console.log(this.$.gfs.getFileNameFromPath(ruta));
            let ruta_parent = this.$.gfs.getParentPath(ruta);
            //console.log(ruta_parent);
        
            console.log("Directory create/delete.");
            await this.$.gfs.mkdir(ruta_parent, true);
            await this.$.gfs.rmdir("/Dir1/Dir2");
            await this.$.gfs.mkdir('/Dir1/Dir2-2', false);
            await this.$.gfs.mkdir('/Dir1/Dir2-3/Diiir', true);
            
            console.log("File add/get/mv.");
            await this.$.gfs.addFile( "/Dir1/", "codigos_guia/store/file.txt", true );
            await this.$.gfs.mvFile("/Dir1/file.txt", "/Dir1/Dir2-2");
            /*
            console.log(await this.$.gfs.getFileToString( "/Dir1/Dir2-2/passwd"));
            await this.$.gfs.getFileToLocal( "/Dir1/Dir2-2/passwd", "asq.txt" );
        
            console.log("Directory get.");
            console.log( await this.$.gfs.getDirFromPath( "/Dir1/Dir2-2", false ) );
            console.log(await this.$.gfs.getDirContent('/Dir1'));
            console.log(JSON.stringify(await this.$.gfs.getDirTree('/Dir1'), null, 2));
            */
    }
  
}


/*
setTimeout( async function() {
    console.log("Start main moduleToTest");
    var objModToTest = new class_mngSystemFS( arrService_ModParams );
    await objModToTest.arrParams.arrModel.tadFSDirectory.deleteMany({});
    
    //console.log("Path op.");
    let ruta = "/Dir1/Dir2/Dir3/file.txt";
    //console.log( ruta );
    let ruta_exp = objModToTest.getExplodedPath( ruta );
    //console.log( ruta_exp );
    //console.log( objModToTest.getImplodedPath( ruta_exp ));
    //console.log(objModToTest.getFileNameFromPath(ruta));
    let ruta_parent = objModToTest.getParentPath(ruta);
    //console.log(ruta_parent);

    console.log("Directory create/delete.");
    await objModToTest.mkdir(ruta_parent, true);
    await objModToTest.rmdir("/Dir1/Dir2");
    await objModToTest.mkdir('/Dir1/Dir2-2', false);
    await objModToTest.mkdir('/Dir1/Dir2-3/Diiir', true);
      
    console.log("File add/get/mv.");
    await objModToTest.addFile( "/Dir1/", "/etc/passwd", true );
    await objModToTest.mvFile("/Dir1/passwd", "/Dir1/Dir2-2");
    console.log(await objModToTest.getFileToString( "/Dir1/Dir2-2/passwd"));
    await objModToTest.getFileToLocal( "/Dir1/Dir2-2/passwd", "asq.txt" );
  
    console.log("Directory get.");
    console.log( await objModToTest.getDirFromPath( "/Dir1/Dir2-2", false ) );
    console.log(await objModToTest.getDirContent('/Dir1'));
    console.log(JSON.stringify(await objModToTest.getDirTree('/Dir1'), null, 2));

}, 2000);
*/