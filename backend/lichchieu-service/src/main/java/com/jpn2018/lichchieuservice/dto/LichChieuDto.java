package com.jpn2018.lichchieuservice.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LichChieuDto {
	private Long id;

    private int price;

    private LocalDate date;


    
    private String tenPhim;


    
    private String tenPhong;

    
    private String timeStart;
    private String timeEnd;

}
