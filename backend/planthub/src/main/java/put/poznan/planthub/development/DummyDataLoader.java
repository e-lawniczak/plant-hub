package put.poznan.planthub.development;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import put.poznan.planthub.offer.category.Category;
import put.poznan.planthub.offer.category.CategoryRepository;
import put.poznan.planthub.user.UserService;
import put.poznan.planthub.user.projections.RegisterDto;
import put.poznan.planthub.user.roles.Role;
import put.poznan.planthub.user.roles.RoleRepository;

@Component
@AllArgsConstructor
public class DummyDataLoader implements CommandLineRunner {

    @Autowired
    private final UserService userService;

    @Autowired
    private final CategoryRepository categoryRepository;

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {

        try{
            roleRepository.save(new Role(1L, "ADMIN"));
            roleRepository.save(new Role(2L, "USER"));

            userService.register(new RegisterDto("jasonmomoa@o2.pl", "1234", "Jason", "Momoa", "123123123", "Poznań"));
            userService.register(new RegisterDto("dzejzi@o2.pl", "1234", "Dzej", "Zi", "123123123", "Wrocław"));
            userService.register(new RegisterDto("zygmuntwaza@o2.pl", "1234", "Zygmunt", "Waza", "123123123", "Gniezno"));

            categoryRepository.save(new Category(1L, "Pot plant"));
            categoryRepository.save(new Category(2L, "Garden plant"));
            categoryRepository.save(new Category(3L, "Small plant"));
            categoryRepository.save(new Category(4L, "Big plant"));
            categoryRepository.save(new Category(5L, "Medium plant"));
            categoryRepository.save(new Category(6L, "Field plant"));
            categoryRepository.save(new Category(7L, "Decoration"));
            categoryRepository.save(new Category(8L, "Other"));

        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}