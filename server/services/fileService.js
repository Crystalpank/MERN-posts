const uuid = require("uuid")
const path = require("path")
const fs = require("fs")

class FileService {
    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('upload', fileName)
            file.mv(filePath)
            return fileName
        } catch (e) {
            console.log(e)
        }
    }
    deleteFile(fileName) {
        try {
            const filePath = path.resolve('upload', fileName)
            fs.unlink(filePath, err => {
                if (err) {
                    console.log("Файл не существует")
                    return 
                } 
            })
            return filePath
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new FileService()