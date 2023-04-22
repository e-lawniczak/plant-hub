package put.poznan.planthub.offer;

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

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody OfferDto offer) {
        return offerService.addOffer(offer);
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<OfferDto> update(@PathVariable("id") Long id, @RequestBody UpdateOfferDto offer) {
        return offerService.updateOffer(id, offer);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<OfferDto> delete(@PathVariable("id") Long id) {
        return offerService.deleteOffer(id);
    }

    @GetMapping("/all")
    public ResponseEntity<List<AllOffersDto>> getAllOffers() {
        return offerService.getAllOffers();
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
