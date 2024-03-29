package put.poznan.planthub.file.projections;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import put.poznan.planthub.file.File;
import put.poznan.planthub.offer.Offer;
import put.poznan.planthub.offer.projections.AllOffersDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FileDataDto {
    private Long id;
    private String name;
    private String type;

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
    }
}
