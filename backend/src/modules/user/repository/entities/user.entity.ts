import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { ENUM_USER_SIGN_UP_FROM } from '../../constants/user.enum.constant';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
    id: string;

    @Column({ unique: true })
    @IsEmail()
    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @Column()
    @IsString()
    @ApiProperty()
    firstName: string;

    @Column()
    @IsString()
    @ApiProperty()
    lastName: string;

    @Column({ select: false })
    @IsString()
    @Exclude()
    @ApiHideProperty()
    password: string;

    @Column({ type: 'timestamp', nullable: true })
    @ApiProperty()
    passwordExpired: Date;

    @Column({ type: 'timestamp', nullable: true })
    @ApiProperty()
    passwordCreated: Date;

    @Column({ default: 0 })
    @ApiProperty()
    passwordAttempt: number;

    @Column({ type: 'timestamp' })
    @ApiProperty()
    signUpDate: Date;

    @Column({
        type: 'enum',
        enum: ENUM_USER_SIGN_UP_FROM,
        default: ENUM_USER_SIGN_UP_FROM.LOCAL,
    })
    @ApiProperty({ enum: ENUM_USER_SIGN_UP_FROM })
    signUpFrom: ENUM_USER_SIGN_UP_FROM;

    @Column({ select: false })
    @Exclude()
    @ApiHideProperty()
    salt: string;

    @Column({ default: false })
    @ApiProperty()
    blocked: boolean;

    @Column({ nullable: true, type: 'timestamp' })
    @ApiProperty()
    blockedDate?: Date;

    @Column({ nullable: true, type: 'timestamp' })
    @ApiProperty()
    lastSeenAt: Date;

    @Column('jsonb', { nullable: true })
    @ApiProperty()
    lastSeenSparkline: {
        timestamp: Date;
        count: number;
    }[];

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updatedAt: Date;

    @DeleteDateColumn({ nullable: true, type: 'timestamp' })
    @ApiProperty()
    deletedAt?: Date;
}

export type UserDoc = UserEntity & Document;
