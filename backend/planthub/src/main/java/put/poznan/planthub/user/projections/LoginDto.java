package put.poznan.planthub.user.projections;

import lombok.Data;

@Data
public class LoginDto {

    private String email;
    private String password;
}