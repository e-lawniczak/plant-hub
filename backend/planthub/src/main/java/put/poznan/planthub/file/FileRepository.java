package put.poznan.planthub.file;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import javax.swing.text.html.Option;

@EnableJpaRepositories
@Repository
public interface FileRepository  extends JpaRepository<File, Long> {
    Optional<File> findById(Long id);

    boolean existsById(Long id);
}

