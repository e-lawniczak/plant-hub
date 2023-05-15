package put.poznan.planthub.development;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import put.poznan.planthub.user.User;
import put.poznan.planthub.user.UserRepository;
import put.poznan.planthub.user.UserService;
import put.poznan.planthub.user.projections.RegisterDto;

@Component
@AllArgsConstructor
public class DummyDataLoader implements CommandLineRunner {

    @Autowired
    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {

        try{
            userService.register(new RegisterDto("jasonmomoa@o2.pl", "1234", "Jason", "Momoa", "123123123", "Poznań"));
            userService.register(new RegisterDto("dzejzi@o2.pl", "1234", "Dzej", "Zi", "123123123", "Wrocław"));
            userService.register(new RegisterDto("zygmuntwaza@o2.pl", "1234", "Zygmunt", "Waza", "123123123", "Gniezno"));
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}