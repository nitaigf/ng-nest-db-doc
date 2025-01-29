// sis/licenciado/licenciado.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sis_licenciado' })
export class Licenciado {
  @PrimaryGeneratedColumn()
  id_licenciado: number;

  @Column({ length: 100 })
  ds_licenciado: string;

  @Column({ length: 250 })
  nr_licenca: string;

  @Column({ length: 30 })
  sigla: string;

  @Column('int')
  id_municipio: number;

  @Column({ type: 'bytea', nullable: false })
  imagem: Buffer;

  @Column('int')
  cd_siafi: number;

  @Column('int')
  id_acesso: number;

  @Column({ type: 'timestamp' })
  dt_bloqueio: Date;

  @Column({ type: 'timestamp' })
  dt_ultima_atualizacao: Date;

  @Column('int')
  qtd_dias_atualizar: number;

  @Column('int')
  crc: number;
}
