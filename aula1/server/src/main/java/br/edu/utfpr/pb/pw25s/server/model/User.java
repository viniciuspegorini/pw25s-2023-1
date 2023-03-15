package br.edu.utfpr.pb.pw25s.server.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "tb_user")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @NotNull
    @NotEmpty
    @Size(min = 4, max = 50)
    @Column(length = 50)
    private String username;

    @Size(min = 4, max = 50)
    @Column(length = 50, name = "display_name")
    private String displayName;

    @Size(min = 6)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

}
