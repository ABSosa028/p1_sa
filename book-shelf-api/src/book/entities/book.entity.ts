import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { PersonalLibrery } from '../../personal-librery/entities/personal-librery.entity';
import { Collection } from '../../collection/entities/collection.entity';
import { User } from 'src/auth/entities/user.entity';
import { ReaccionLibro } from './reaccion-libro.entity';
import { ComentarioLibro } from './comentario-libro.entity';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column()
  autor: string;

  @Column()
  genero: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  anioPublicacion: number;

  @Column()
  imagen: string;

  @Column('bool', {
        default: false

    })
    isRead: boolean;

  @ManyToOne(() => User, (usuario) => usuario.colecciones, { onDelete: 'CASCADE' })
    usuario: User;

   // Relación muchos a muchos inversa
  @ManyToMany(() => PersonalLibrery, (libreria) => libreria.libros)
  librerias: PersonalLibrery[];

  @ManyToMany(() => Collection, (coleccion) => coleccion.libros)
  colecciones: Collection[];

  // Nuevas relaciones para comentarios y reacciones
  @OneToMany(() => ComentarioLibro, (comentario) => comentario.libro)
  comentarios: ComentarioLibro[];

  @OneToMany(() => ReaccionLibro, (reaccion) => reaccion.libro)
  reacciones: ReaccionLibro[];
  
}