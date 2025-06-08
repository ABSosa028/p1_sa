import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { PersonalLibrery } from '../../personal-librery/entities/personal-librery.entity';
import { Collection } from '../../collection/entities/collection.entity';
import { ComentarioLibro } from 'src/book/entities/comentario-libro.entity';
import { ReaccionLibro } from 'src/book/entities/reaccion-libro.entity';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    apellido: string;

    @Column('text', {
        unique: true

    })
    email: string;

    @Column('text', {
        unique: true

    })
    username: string;

    @Column('text',
        {
            select: false

        })
    password: string;
    @Column('text')
    telefono: string;

    @Column('text')
    direccion: string;

    @Column('text')
    ciudad: string;

    @Column('text')
    departamento: string;

    @Column('int')
    sexo: number;

    @Column('text')
    foto: string;



    @Column('timestamp',
        {
            default: () => 'CURRENT_TIMESTAMP'
        }
    )
    fecha_creacion: string;

    @Column('bool', {
        default: true

    })
    isActive: boolean;
    @Column('text', {
        array: true,
        default: ['user']

    })
    roles: string[]


    @OneToOne(() => PersonalLibrery, (bp) => bp.usuario, { cascade: true })
    bibliotecaPersonal: PersonalLibrery;

    @OneToMany(() => Collection, (coleccion) => coleccion.usuario)
    colecciones: Collection[];

    @OneToMany(() => ComentarioLibro, (comentario) => comentario.usuario)
comentarios: ComentarioLibro[];

@OneToMany(() => ReaccionLibro, (reaccion) => reaccion.usuario)
reacciones: ReaccionLibro[];

}

