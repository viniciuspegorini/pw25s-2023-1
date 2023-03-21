package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.annotation.UniqueUsername;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "tb_user") //, uniqueConstraints = @UniqueConstraint(columnNames = "username"))
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @UniqueUsername
    @NotNull(message = "{br.edu.utfpr.pb.pw26s.server.user.username.constraints.NotNull.message}")
    @Size(min = 4, max = 50, message = "{br.edu.utfpr.pb.pw26s.server.user.username.constraints.Size.message}")
    @Column(length = 50)
    private String username;

    @NotNull
    @Size(min = 4, max = 50)
    @Column(length = 50, name = "display_name")
    private String displayName;

    @NotNull(message = "{br.edu.utfpr.pb.pw26s.server.user.password.constraints.NotNull.message}")
    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{br.edu.utfpr.pb.pw26s.server.user.password.constraints.Pattern.message}")
    private String password;

}
