const uuid = require("uuid")
const path = require("path")
const fs = require("fs")
const Jimp = require("jimp")
const Resize = require("./jimp-patch-rotate")

class FileService {
    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('upload', fileName)
            Jimp.read(file.data, (err, image) => {
                if (err) console.log(err)
                // console.log(image)
                const ratio = image.bitmap.width / image.bitmap.height
                if (image.bitmap.width >= image.bitmap.height) {
                    const newHeight = 1024 / ratio
                    image
                        .flip(true, true)
                        .resize(1024, newHeight)
                } else {
                    const newWidth = 1024 * ratio
                    image
                        .resize(newWidth, 1024)
                        image = Resize(90, image)
                }
                image
                    .quality(75)
                    .writeAsync(filePath)
            })
            // file.mv(filePath)
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