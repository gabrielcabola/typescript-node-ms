import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn, Generated} from "typeorm";
import { Upload } from "./upload";

@Entity()
export class Image {

    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    @Generated("uuid")
    uuid!: string;
    
    @Column()
    user!: number;
  
    @Column({
      type: 'text'
    })
    filePath!: string;

    @Column({
      type: 'text'  
    })
    fileName!: string;
  
    @Column({
      type: 'text'  
    })
    originalFileName!: string;
  
    @Column()
    startedAt!: Date;
  
    @Column()
    processedAt!: Date;
  
    @Column({ nullable: true, default: false })
    isProcessed?: boolean;
    
    @Column({ nullable: true, default: 0 })
    totalMBSize?: number;

    @Column({ nullable: true })
    uploadId!: number;
    @ManyToOne(_type => Upload, (upload: Upload) => upload.images)
    @JoinColumn()

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

}