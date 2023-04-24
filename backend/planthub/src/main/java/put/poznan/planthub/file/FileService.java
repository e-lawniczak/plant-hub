package put.poznan.planthub.file;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties.Throttler;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import put.poznan.planthub.file.projections.FileDataDto;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.OfferRepository;

@Service
public class FileService {

    @Autowired
    FileRepository fileRepository;
    @Autowired
    OfferRepository offerRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    // public File uploadImage(MultipartFile file) throws IOException {
    // File pFile = new File();
    // System.out.println(file);
    // pFile.setName(file.getOriginalFilename());
    // pFile.setType(file.getContentType());
    // pFile.setFileData(FileUtil.compressImage(file.getBytes()));
    // return fileRepository.save(pFile);
    // }
    public List<File> uploadImage(Long offerId, MultipartFile[] file) {
        Optional<Offer> offer = offerRepository.findById(offerId);

        if (offer.isEmpty())
            return null;
        List<File> resList = new ArrayList<File>();
        List.of(file).stream().forEach(f -> {
            File pFile = new File();
            pFile.setName(f.getOriginalFilename());
            pFile.setType(f.getContentType());
            pFile.setOffer(offer.get());
            try {
                pFile.setFileData(FileUtil.compressImage(f.getBytes()));
            } catch (IOException e) {
            }
            resList.add(fileRepository.save(pFile));
        });
        return resList;
    }

    public byte[] downloadImage(Long fileId) {
        Optional<File> imageData = fileRepository.findById(fileId);
        return FileUtil.decompressImage(imageData.get().getFileData());
    }

    public List<File> loadAllFiles(Long offerId) {
        Optional<Offer> offer = offerRepository.findById(offerId);
        if (offer.isEmpty())
            return null;
        System.out.println("XDDD2");

        List<File> data = fileRepository.findAllByOffer(offer.get());
        System.out.println("XDDD");
        // List<FileDataDto> response = data.stream().map(f ->
        // FileDataDto.of(f)).toList();

        return data;
    }

}
