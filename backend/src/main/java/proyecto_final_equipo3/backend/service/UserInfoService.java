package proyecto_final_equipo3.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import proyecto_final_equipo3.backend.exceptions.particular.RegisterErrorException;
import proyecto_final_equipo3.backend.model.UserInfo;
import proyecto_final_equipo3.backend.persistence.UserInfoRepository;

import java.util.Optional;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    private UserInfoRepository repository;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserInfo> userDetail = repository.findByEmail(email);
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + email));
    }

    public String addUser(UserInfo userInfo) throws RegisterErrorException {
        Optional<UserInfo> existingUserByEmail = repository.findByEmail(userInfo.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new RegisterErrorException("Email already exists.");
        }
        userInfo.setPassword(encoder.encode(userInfo.getPassword()));
        repository.save(userInfo);
        return "User Added Successfully";
    }
    public String promoteToAdmin(String email) {
        Optional<UserInfo> userDetail = repository.findByEmail(email);
        if (userDetail.isPresent()) {
            UserInfo userInfo = userDetail.get();
            userInfo.setRoles("ROLE_ADMIN");
            repository.save(userInfo);
            return "User Promoted to Admin Successfully";
        } else {
            throw new UsernameNotFoundException("User not found " + email);
        }
    }

    public boolean existsRootUser() {
        return repository.existsByRoles("ROLE_ROOT");
    }

}
