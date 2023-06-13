package put.poznan.planthub.file.projections;

import lombok.*;
import put.poznan.planthub.file.File;
import put.poznan.planthub.file.FileUtil;
import put.poznan.planthub.offer.projections.AllOffersDto;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class FileSimpleDto {
    private Long id;
    private String name;
    private String type;
    private byte[] fileData;

    public static FileSimpleDto of(File file) {
        if (file == null) {
            return null;
        }
        return new FileSimpleDto(file);
    }

    private FileSimpleDto(File file) {
        id = file.getId();
        name = file.getName();
        type = file.getType().replace("/", "_");
        fileData = FileUtil.decompressImage(file.getFileData());
    }
}
