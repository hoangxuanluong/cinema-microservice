package com.jpn2018.veservice.service;

import com.jpn2018.veservice.dto.VeDto;
import com.jpn2018.veservice.dto.VeFullResponse;
import com.jpn2018.veservice.entity.Ve;

import java.util.List;

public interface VeService {
    Ve saveVe(Ve ve);

    List<Ve> getAllVes();

    Ve getVeById(Long id);

    void deleteVeById(Long id);

    Ve updateVe(Long id, Ve ve);

    List<VeFullResponse> findVeByLichChieu(Long lichChieuId);

    public VeDto toDto(Ve ve);

    public List<VeDto> getAllVeDtos();

    public VeDto getVeDtoById(Long id);
}