package put.poznan.planthub.file;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    @Autowired
    FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public File uploadImage(MultipartFile file) throws IOException {
        File pFile = new File();
        pFile.setName(file.getOriginalFilename());
        pFile.setType(file.getContentType());
        pFile.setFileData(FileUtil.compressImage(file.getBytes()));
        return fileRepository.save(pFile);
    }
    // public List<File> uploadImage(MultipartFile file) throws IOException {
    // List<File> resList = new ArrayList<File>();
    // List.of(file).stream().forEach(f -> {
    // File pFile = new File();
    // pFile.setName(f.getOriginalFilename());
    // pFile.setType(f.getContentType());
    // try {
    // pFile.setFileData(FileUtil.compressImage(f.getBytes()));
    // } catch (IOException e) {
    // e.printStackTrace();
    // }
    // resList.add(fileRepository.save(pFile));
    // });
    // return resList;
    // }

    public byte[] downloadImage(Long fileId) {
        Optional<File> imageData = fileRepository.findById(fileId);
        return FileUtil.decompressImage(imageData.get().getFileData());
    }

}
