import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Libro } from '../../book/entities/book.entity';

@Entity('biblioteca_personal')
export class PersonalLibrery {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (usuario) => usuario.bibliotecaPersonal, { onDelete: 'CASCADE' })
  @JoinColumn() // Esta entidad es la que almacena la FK del usuario
  usuario: User;
  
 @ManyToMany(() => Libro, (libro) => libro.librerias)
  @JoinTable() // Se crea una tabla intermedia automáticamente
  libros: Libro[];

  @Column({ default: 'pendiente' }) // 'leido', 'en_progreso', etc.
  estadoLectura: string;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaAgregado: Date;
}



