import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Unique } from 'typeorm';
import { Libro } from './book.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity('reaccion_libro')
@Unique(['libro', 'usuario']) // Evita duplicados
export class ReaccionLibro {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['like'], default: 'like' })
  tipo: 'like';

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Libro, (libro) => libro.reacciones, { onDelete: 'CASCADE' })
  libro: Libro;

  @ManyToOne(() => User, (user) => user.reacciones, { onDelete: 'CASCADE' })
  usuario: User;
}
