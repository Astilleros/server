"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const core_1 = require("../core");
class mngFile {
    initSchemas() {
        const { createModel } = require('mongoose-gridfs');
        this.GridFile = createModel({
            modelName: 'GridFile',
            connection: core_1.mongoose.connection
        });
    }
    initRouter() {
    }
    getFileInfo(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GridFile.findOne({ _id });
        });
    }
    addFileFromStream(filename, readableStream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                yield this.GridFile.write({
                    filename: filename,
                }, readableStream, (error, objFile) => __awaiter(this, void 0, void 0, function* () {
                    if (error)
                        reject(error);
                    else
                        resolve(objFile);
                }));
            }));
        });
    }
    getFileStream(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = yield this.GridFile.findOne({ _id });
            return file === null || file === void 0 ? void 0 : file.getDownloadStream();
        });
    }
    copyFile(id, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileStream = yield this.getFileStream(id);
            return yield this.addFileFromStream(filename, fileStream);
        });
    }
    getFileToString(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let objReadStream = yield this.getFileStream(_id);
            const chunks = [];
            return yield new Promise((resolve, reject) => {
                objReadStream.on('data', (chunk) => chunks.push(chunk));
                objReadStream.on('error', reject);
                objReadStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
            });
        });
    }
    removeFile(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GridFile.unlink({ _id }, () => { });
        });
    }
    renameFile(_id, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.GridFile.findOneAndUpdate({ _id }, { filename }, {
                new: true,
                useFindAndModify: false
            });
        });
    }
}
exports.File = new mngFile();
