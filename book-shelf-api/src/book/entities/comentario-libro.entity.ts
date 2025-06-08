import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Libro } from './book.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('comentario_libro')
export class ComentarioLibro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  comentario: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Libro, (libro) => libro.comentarios, { onDelete: 'CASCADE' })
  libro: Libro;

  @ManyToOne(() => User, (user) => user.comentarios, { onDelete: 'CASCADE' })
  usuario: User;
}
