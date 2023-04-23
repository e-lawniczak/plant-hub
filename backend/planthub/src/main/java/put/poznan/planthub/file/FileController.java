package put.poznan.planthub.file;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;
import put.poznan.planthub.offer.projections.UpdateOfferDto;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.UserRepository;

@Service
@RequestMapping(path = "/files")
public class FileController {

    @Autowired
    private FileService fileService;
    @ResponseStatus(value = HttpStatus.OK)
	@PostMapping("/upload")
	public void uploadImage(@RequestPart MultipartFile[] files) throws IOException{
        fileService.uploadImage(files);
        // TODO: zwiększyć limit pliku
	}
	
	@GetMapping("/download/{type}/{fileName}")
	public ResponseEntity<byte[]> downloadImage(@PathVariable Long fileId, @PathVariable String type) {
		byte[] image = fileService.downloadImage(fileId);
        String fileType = type;
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(fileType)).body(image);
	}
    
}