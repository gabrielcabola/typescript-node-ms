import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn, Generated} from "typeorm";
import { Image } from "./image";

@Entity()
export class Upload {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @Generated("uuid")
    uuid!: string;
    
    @Column()
    user!: number;
  
    @OneToMany(_type=> Image, (image: Image) => image.uploadId)
    images!: Array<Image>;

    @Column("simple-json")
    renderConfig!: {
            quality: number,
            resizeEngine: string,
            maxImgDimension: number
    };
  
    @Column({ nullable: true })
    watermark!: number;

    @CreateDateColumn()
    startedAt!: Date;
  
    @Column({ nullable: true })
    finishedAt!: Date;
  
    @Column({ nullable: true, default: false })
    isFinished!: boolean;
    
    @Column({ nullable: true, default: 0 })
    totalFiles!: number;
  
    @Column({ nullable: true, default: 0 })
    totalMBSize!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn({ nullable: true })
    updatedAt!: Date;

}