package put.poznan.planthub.file;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

import put.poznan.planthub.file.projections.FileDataDto;
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
	@PostMapping("/upload/{offerId}")
	public ResponseEntity<String> uploadImage(@PathVariable Long offerId, @RequestPart MultipartFile[] files)
			throws IOException {
		// TODO: zwiększyć limit pliku

		List<File> image = fileService.uploadImage(offerId, files);
		if (image == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Offer does not exist");
		return ResponseEntity.status(HttpStatus.OK).body("OK");
	}

	@GetMapping("/download/{type}/{fileId}")
	public ResponseEntity<byte[]> downloadImage(@PathVariable Long fileId, @PathVariable String type) {
		byte[] image = fileService.downloadImage(fileId);
		String fileType = type;
		return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.valueOf(fileType)).body(image);
	}

	@GetMapping("/download/all/{offerId}")
	public ResponseEntity<List<File>> getAllFilesForOffer(@PathVariable Long offerId) {
		return ResponseEntity.status(HttpStatus.OK).body(fileService.loadAllFiles(offerId));

	}
}