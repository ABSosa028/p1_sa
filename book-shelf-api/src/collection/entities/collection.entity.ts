import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Libro } from '../../book/entities/book.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @ManyToOne(() => User, (usuario) => usuario.colecciones, { onDelete: 'CASCADE' })
  usuario: User;

  @ManyToMany(() => Libro, (libro) => libro.colecciones)
  @JoinTable({
    name: 'coleccion_libro',
    joinColumn: { name: 'coleccion_id' },
    inverseJoinColumn: { name: 'libro_id' },
  })
  libros: Libro[];


  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
    name: 'coleccion_usuarios_compartidos',
    joinColumn: { name: 'coleccion_id' },
    inverseJoinColumn: { name: 'usuario_id' },
  })
  usuariosCompartidos: User[];
}
