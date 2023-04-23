package put.poznan.planthub.file;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    Optional<File> findById(Long id);

    Optional<List<File>> findAllByName(String name);

    boolean existsById(Long id);
}