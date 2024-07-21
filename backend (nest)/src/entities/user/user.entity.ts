import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'email', type: 'varchar' })
  email: string

  @Column({ name: 'password', type: 'varchar' })
  password: string

  @Column({ name: 'phone', type: 'varchar' })
  phone: string

  @Column({ name: 'photo', type: 'varchar', default: "http://localhost:9000/images/users/default.png", nullable: true })
  photo: string

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string

  @Column({ name: 'last_name', type: 'varchar' })
  lastName: string

  @Column({ name: 'rating', type: 'int', default: 100 })
  rating: number

  // @Column({ name: 'date_register', type: 'timestamp', nullable: true })
  // dateRegister: Date

  // @Column({ name: 'address', type: 'varchar', nullable: true })
  // address: string

  // @Column({ name: 'birth_date', type: 'timestamp', nullable: true })
  // birthDate: Date

  // @Column({ name: 'gender', type: 'enum', enum: E_Gender, nullable: true })
  // gender: E_Gender | null
}
