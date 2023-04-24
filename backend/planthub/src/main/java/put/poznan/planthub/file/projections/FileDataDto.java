package put.poznan.planthub.file.projections;

import put.poznan.planthub.file.File;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.projections.AllOffersDto;

public class FileDataDto {
    private Long id;
    private String name;
    private String type;
    private AllOffersDto offer;

    public static FileDataDto of(File file) {
        if (file == null) {
            return null;
        }
        return new FileDataDto(file);
    }

    private FileDataDto(File file) {
        id = file.getId();
        name = file.getName();
        type = file.getType();
        offer = AllOffersDto.of(file.getOffer());
    }
}
