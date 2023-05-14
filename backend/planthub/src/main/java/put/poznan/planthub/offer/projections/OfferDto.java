package put.poznan.planthub.offer.projections;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.*;
import put.poznan.planthub.file.File;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.category.Category;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OfferDto {


    private String title;

    private String description;

    private String category;

    private Date date;
    private Boolean active;
    
    public static OfferDto of(Offer offer) {
        if (offer == null) {
            return null;
        }
        return new OfferDto(offer);
    }

    private OfferDto(Offer offer) {
        title = offer.getTitle();
        description = offer.getDescription();
        category = offer.getCategory().getName();
        date = offer.getDate();
        active = offer.getActive();
    }
}
