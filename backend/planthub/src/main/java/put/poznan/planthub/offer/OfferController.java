package put.poznan.planthub.offer;

import java.io.Console;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import put.poznan.planthub.offer.projections.AllOffersDto;
import put.poznan.planthub.offer.projections.OfferDto;
import put.poznan.planthub.offer.projections.UpdateOfferDto;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/offers")
public class OfferController {
    @Autowired
    private OfferService offerService;

    @PostMapping("/add/{email}")
    public ResponseEntity<String> add(@RequestBody OfferDto offer, @PathVariable String email) {
        return offerService.addOffer(offer, email);
    }

    @PatchMapping("/update/{email}/{id}")
    public ResponseEntity<OfferDto> update(@PathVariable("id") Long id, @RequestBody UpdateOfferDto offer) {
        return offerService.updateOffer(id, offer);
    }

    @PatchMapping("/toggleactive/{email}/{id}")
    public ResponseEntity<OfferDto> toggleActive(@PathVariable("id") Long id) {
        return offerService.toggleActiveOffer(id);
    }
    @DeleteMapping("/delete/{email}/{id}")
    public ResponseEntity<OfferDto> delete(@PathVariable("id") Long id) {
        return offerService.deleteOffer(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AllOffersDto>> getAllOffers() {
        return offerService.getAllOffers();
    }

    @GetMapping("/all/{email}")
    public ResponseEntity<List<AllOffersDto>> getAllOffers(@PathVariable("email") String email) {
        System.out.println(email);
        return offerService.getUserOffers(email);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AllOffersDto> getSingleOffer(@PathVariable("id") Long id) {
        try {
            return offerService.getSingleOffer(id);
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }
}
