package put.poznan.planthub.user.projections;

import java.util.List;

import lombok.Value;
import put.poznan.planthub.user.User;

@Value
public class RepUserDto {

    private List<User> reppingUsers;
    private Long votes;
    public void repUser(User user, User reppingUser) {
        reppingUsers.add(reppingUser);
        user.setReppingUsers(reppingUsers);
        user.setVotes(votes + 1);
    }
}