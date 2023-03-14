package br.edu.utfpr.pb.pw25s.server.model;

import lombok.*;

import javax.persistence.*;

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

    @Column(length = 50)
    private String username;

    @Column(length = 50, name = "display_name")
    private String displayName;

    private String password;

}
