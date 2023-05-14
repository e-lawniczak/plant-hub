package put.poznan.planthub.offer.projections;

import java.util.Calendar;
import java.util.Date;

import lombok.*;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.category.Category;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UpdateOfferDto {


    private String title;

    private String description;

    private String category;

    private Boolean active;
    
    public static UpdateOfferDto of(Offer offer) {
        if (offer == null) {
            return null;
        }
        return new UpdateOfferDto(offer);
    }

    private UpdateOfferDto(Offer offer) {
        title = offer.getTitle();
        description = offer.getDescription();
        category = offer.getCategory().getName();
        active = offer.getActive();
    }
}
