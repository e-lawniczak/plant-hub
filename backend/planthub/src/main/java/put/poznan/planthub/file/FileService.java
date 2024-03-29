package put.poznan.planthub.file;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties.Throttler;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import put.poznan.planthub.file.projections.FileDataDto;
import put.poznan.planthub.file.projections.FileDto;
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

    public File downloadImage(Long fileId) {
        Optional<File> imageData = fileRepository.findById(fileId);
        if (imageData.isEmpty())
            return null;
        return imageData.get();
        // return FileUtil.decompressImage(imageData.get().getFileData());
    }

    public List<FileDto> loadAllFiles(Long offerId) {
        Optional<Offer> offer = offerRepository.findById(offerId);
        if (offer.isEmpty())
            return null;

        List<File> data = fileRepository.findAllByOffer(offer.get());
        List<FileDto> response = data.stream().map(d -> FileDto.of(d)).collect(Collectors.toList());
        response = response.stream().map(d -> {
            FileDto f = d;
            f.setType(d.getType().replace("_", "/"));
            return f;
        }).collect(Collectors.toList());
        return response;
    }

    public ResponseEntity<String> deleteImg(String email, Long offerId, Long fileId) {

        Optional<File> file = fileRepository.findById(fileId);
        if (file.isEmpty())
            return new ResponseEntity<>("File not found", HttpStatus.BAD_REQUEST);
        File fileObj = file.get();

        if (fileObj.getOffer().getId() != offerId)
            return new ResponseEntity<>("Offer error", HttpStatus.BAD_REQUEST);

        if (!fileObj.getOffer().getUser().getEmail().equals(email))
            return new ResponseEntity<>("User error ",
                    HttpStatus.BAD_REQUEST);

        fileRepository.delete(fileObj);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
