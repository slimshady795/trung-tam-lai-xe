/* eslint-disable react-hooks/exhaustive-deps */
import { InfoCircleOutlined, InfoOutlined, LeftOutlined, PauseOutlined, PlayCircleOutlined, RightOutlined, UndoOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import clsx from 'clsx';
import IMG_FLAG from '../../assets/images/flag1.png';

import './style.scss';
import { isNumber } from 'lodash';

// $("#imggoiy").attr("src","https://taplai.net/goiy/"+idTH+".jpg");
// $("#imggoii").attr("src","https://taplai.net/videohuongdan/"+idTH+".mp4");
// sources[0].src = 'https://taplai.net/videos/'+idTH+'.mp4';

const questions = [
  {
    "title": "Người đi bộ đi sang đường bị khuất sau xe tải",
    "total_time": "21.3",
    "time1": 10.427,
    "time2": 13.140,
  }, {
    "title": "Người đi bộ vượt đèn đỏ sang đường",
    "total_time": "33.8",
    "time1": 17.915,
    "time2": 20.133,
  }, {
    "title": "Xe phía trước phanh gấp để tránh xe buýt dừng lại ở bến xe buýt",
    "total_time": "28.5",
    "time1": 15.076,
    "time2": 18.040,
  }, {
    "title": "Xe con đi từ đường nhánh đi nhanh ra ngã ba không có tín hiệu đèn giao thông",
    "total_time": "28.8",
    "time1": 10.627,
    "time2": 15.389,
  }, {
    "title": "Xe máy đi thẳng đột ngột rẻ trái sang đường trước đầu xe bạn",
    "total_time": "27.9",
    "time1": 12.397,
    "time2": 16.473,
  }, {
    "title": "Xe buýt lấn làn để vượt qua ngã ba",
    "total_time": "25.3",
    "time1": 13.171,
    "time2": 16.443,
  }, {
    "title": "Xe phía trước phanh gấp người đi bộ vượt đèn đỏ qua đường",
    "total_time": "27.5",
    "time1": 10.536,
    "time2": 14.986,
  }, {
    "title": "Xe đạp bất ngờ đi ra từ đường nhánh tại ngã ba",
    "total_time": "28.6",
    "time1": 10.506,
    "time2": 13.450,
  }, {
    "title": "Ô tô lấn làn đường đối diện vượt xe tải đang dừng đỗ khu vực đông đúc",
    "total_time": "17.8",
    "time1": 8.241,
    "time2": 10.980,
  }, {
    "title": "Xe ô tô bất ngờ đi nhanh ra từ đường nhánh bên trái tại ngã ba",
    "total_time": "25.7",
    "time1": 11.883,
    "time2": 16.232,
  }, {
    "title": "Xe bồn tại đường nhánh lấn làn rẽ tại ngã 3 khi có nhiều phương tiện đang dừng đỗ",
    "total_time": "27.0",
    "time1": 10.182,
    "time2": 17.720,
  }, {
    "title": "Xe oto lấn làn vượt ẩu tại giao lộ",
    "total_time": "31.3",
    "time1": 13.793,
    "time2": 16.110,
  }, {
    "title": "Người đi xe đạp từ vỉa hè bất ngờ đi xuống đường để sang đường",
    "total_time": "24.5",
    "time1": 11.291,
    "time2": 13.637,
  }, {
    "title": "Xe tải qua hầm chui dân sinh",
    "total_time": "28.5",
    "time1": 14.045,
    "time2": 17.787,
  }, {
    "title": "Xe phía trước phanh gấp để tránh làn xe rẽ tại ngã ba",
    "total_time": "27.6",
    "time1": 13.056,
    "time2": 15.613,
  }, {
    "title": "Xe oto từ đường nhánh bất ngờ đi nhanh ra có nguy cơ va chạm với xe của bạn",
    "total_time": "24.7",
    "time1": 11.012,
    "time2": 13.855,
  }, {
    "title": "xe buýt lấn làn vượt ẩu tại ngã 4 có đèn giao thông",
    "total_time": "23.3",
    "time1": 8.314,
    "time2": 10.798,
  }, {
    "title": "Gặp một tài xế xe trên đường đột ngột mở cửa xe",
    "total_time": "25.3",
    "time1": 11.322,
    "time2": 14.665,
  }, {
    "title": "Tài xế xe dừng bên đường đang mở cửa xe",
    "total_time": "23.3",
    "time1": 12.455,
    "time2": 15.309,
  }, {
    "title": "Tài xế xe đang đổ ven đường đi ra mở cửa xe đường hẹp",
    "total_time": "31.6",
    "time1": 18.559,
    "time2": 22.084,
  }, {
    "title": "Tình huống phanh xe phía trước dừng lại và lùi vào khu vực đỗ xe đường hẹp",
    "total_time": "33.4",
    "time1": 13.387,
    "time2": 16.740,
  }, {
    "title": "Gặp xe oto từ đường nhánh bên phải đi ra ngã ba với tốc độ nhanh",
    "total_time": "26.9",
    "time1": 13.150,
    "time2": 16.183,
  }, {
    "title": "Xe oto đối diện lấn làn vượt xe đang có tính hiệu dừng khẩn cấp",
    "total_time": "26.6",
    "time1": 15.058,
    "time2": 17.852,
  }, {
    "title": "Xe tải lớn ở làn đuối diện vượt xe đang thu gom rác",
    "total_time": "28.4",
    "time1": 13.673,
    "time2": 16.604,
  }, {
    "title": "Xe oto khách bất ngờ đi ra tại nơi đỗ xe đường hẹp",
    "total_time": "38.9",
    "time1": 10.682,
    "time2": 16.869,
  }, {
    "title": "Tránh xe tại khu vực công trình sửa đường sau khúc cua",
    "total_time": "37.6",
    "time1": 12.723,
    "time2": 17.440,
  }, {
    "title": "Xe khách bật đèn cảnh báo dừng giữa ngã tư để đón khách",
    "total_time": "29.2",
    "time1": 14.349,
    "time2": 17.326,
  }, {
    "title": "Xe oto phía trước đang đi đột ngột phanh gấp khi gặp vũng nước trên đường",
    "total_time": "30.3",
    "time1": 12.106,
    "time2": 15.705,
  }, {
    "title": "Trời mưa oto phía trước phanh gấp để tránh xe moto tạt đầu khi gặp chướng ngại vật",
    "total_time": "28.2",
    "time1": 11.878,
    "time2": 15.359,
  }, {
    "title": "Đường nông thôn đi xe gặp đàn bò đang đứng trên đường",
    "total_time": "31.4",
    "time1": 10.688,
    "time2": 15.216,
  }, {
    "title": "Đường nông thôn, gặp đàn bò đi từ dưới vệ đường băng qua đường",
    "total_time": "31.9",
    "time1": 9.665,
    "time2": 14.731,
  }, {
    "title": "Người đi bộ băng qua đường lúc chập tối trước đầu xe của bạn",
    "total_time": "23.7",
    "time1": 11.660,
    "time2": 15.577,
  }, {
    "title": "Học sinh đi ra đường gần khu vực trường học",
    "total_time": "27.5",
    "time1": 12.517,
    "time2": 15.655,
  }, {
    "title": "Gặp xe khách tại đường cong cua chiếm hết làn đường tại khu vực đường hẹp",
    "total_time": "21.2",
    "time1": 8.519,
    "time2": 12.784,
  }, {
    "title": "Xe khách phía trước đột ngột giảm tốc độ phanh tránh xe phía trước tại đoạn đường cong",
    "total_time": "21.8",
    "time1": 6.345,
    "time2": 9.574,
  }, {
    "title": "Đường nôn thôn xuất hiện xe máy đi ra từ ngõ phía bên phải",
    "total_time": "28.1",
    "time1": 16.705,
    "time2": 19.100,
  }, {
    "title": "Đường nôn thôn, nhóm xe đạp đi ra từ ngõ phía bên phải",
    "total_time": "29.7",
    "time1": 17.655,
    "time2": 20.493,
  }, {
    "title": "Ban đêm xe oto tải đi ngược chiều bật đèn chiếu làm hai xe máy đi phía trước diện giảm tốc độ",
    "total_time": "26.9",
    "time1": 11.340,
    "time2": 14.469,
  }, {
    "title": "Xe tải từ đường nhánh nhập làn nguy hiểm",
    "total_time": "26.3",
    "time1": 15.049,
    "time2": 18.149,
  }, {
    "title": "Gần cổng làng, có xe moto vượt ẩu lấn làn xe oto đang dừng đổ",
    "total_time": "28.3",
    "time1": 9.594,
    "time2": 13.485,
  }, {
    "title": "Xe con làn đối diện rẻ nhanh cắt ngang xe của bạn tại ngã ba",
    "total_time": "27.6",
    "time1": 12.817,
    "time2": 14.602,
  }, {
    "title": "Tại ngã tư đèn xanh, xe bạn bắt đầu di chuyển có xe moto rẽ cắt ngang đầu xe bạn",
    "total_time": "26.3",
    "time1": 10.880,
    "time2": 13.885,
  }, {
    "title": "Trời mưa, xe con giảm nhanh tốc độ để tránh xe tải chuyển làn đột ngột tránh chướng ngại vật phía trước",
    "total_time": "29.8",
    "time1": 9.697,
    "time2": 13.576,
  }, {
    "title": "Phía sau làn phải có xe con vượt lên và chuyển làn cắt ngang nguy hiểm trước mặt xe bạn",
    "total_time": "21.3",
    "time1": 8.012,
    "time2": 12.063,
  }, {
    "title": "Xe tải ở làn phải vượt lên và đột ngột chuyển sang làn giữa làm xe phía trước phải phanh gấp",
    "total_time": "23.6",
    "time1": 13.000,
    "time2": 15.889,
  }, {
    "title": "Xe oto con ở làn bên trái vượt lên và chuyển làn cắt qua nguy hiểm trước đầu xe của bạn để rẻ qua đường",
    "total_time": "31.3",
    "time1": 20.162,
    "time2": 23.383,
  }, {
    "title": "Xe cấp cứu xin đường và xe con bên trái vượt lên chuyển làn cắt ngang đầu xe của bạn",
    "total_time": "29.8",
    "time1": 17.942,
    "time2": 21.293,
  }, {
    "title": "Xe bạn có tín hiệu chuyển làn trái thì có xe phía sau nháy pha liên tục xin vượt",
    "total_time": "27.7",
    "time1": 8.200,
    "time2": 10.713,
  }, {
    "title": "Ô tô phía trước phanh gấp vì có xe tải tạt sang đột ngột vì gặp chướng ngại vật",
    "total_time": "27.6",
    "time1": 10.259,
    "time2": 14.568,
  }, {
    "title": "Xe tải phía trước làn phải đột ngột tăng tốc và chuyển sang làn giữa làm oto phía trước phanh gấp",
    "total_time": "29.5",
    "time1": 11.965,
    "time2": 16.281,
  }, {
    "title": "Xe tải bật đèn cảnh báo đi ngược đường ở làn bên phải cao tốc",
    "total_time": "30.3",
    "time1": 12.304,
    "time2": 17.263,
  }, {
    "title": "Qua đoạn đường cong đột nhiên có xe tải đi lùi trong làn khẩn cấp",
    "total_time": "29.4",
    "time1": 15.991,
    "time2": 19.570,
  }, {
    "title": "Trên đường cao tốc ban đêm, đột nhiên có xe tải đi ngược chiều lại ở làn khẩn cấp",
    "total_time": "29.2",
    "time1": 16.526,
    "time2": 20.354,
  }, {
    "title": "Xe tải từ đường nhánh nhập vào đường cao tốc với tốc độ cao",
    "total_time": "25.6",
    "time1": 12.677,
    "time2": 16.879,
  }, {
    "title": "Cao tốc xe tải đột ngột giảm tốc và chuyển sang làn xe bạn do gặp sự cố trên đường",
    "total_time": "30.2",
    "time1": 10.741,
    "time2": 14.641,
  }, {
    "title": "Xe con đang dừng ở làn khẩn cấp xi nhan nhập làn trước xe bạn.",
    "total_time": "21.7",
    "time1": 10.695,
    "time2": 13.374,
  }, {
    "title": "Xe con phía trước giảm tốc độ và chuyển sang làn xe của bạn do gặp đoạn đường đang sửa phía trước",
    "total_time": "54.0",
    "time1": 23.932,
    "time2": 30.813,
  }, {
    "title": "Xe tải phía trước giảm tốc độ chuyển sang làn giữa, do phía trước gặp đoạn đường đang sữa chữa",
    "total_time": "41.2",
    "time1": 17.684,
    "time2": 22.433,
  }, {
    "title": "Xe container đang đi từ đường làn trái chuyển ra đường nhánh cắt qua làn đường xe của bạn",
    "total_time": "33.1",
    "time1": 20.280,
    "time2": 23.469,
  }, {
    "title": "Xe 16 chỗ đi ra từ làn đường khẩn cấp đi ra vào làn đường xe của bạn",
    "total_time": "28.1",
    "time1": 10.725,
    "time2": 14.511,
  }, {
    "title": "Xe con từ đường nhánh nhập làn nguy hiểm cắt qua đầu xe của bạn",
    "total_time": "31.7",
    "time1": 20.020,
    "time2": 24.832,
  }, {
    "title": "Xe con đi ngược chiều nguy hiểm tại làn đường tốc độ cao nhất trên cao tốc",
    "total_time": "31.2",
    "time1": 19.125,
    "time2": 23.219,
  }, {
    "title": "Đàn gia súc từ bên đường đi ra cắt qua đầu xe của bạn tại khu vực hỏng hộ lan",
    "total_time": "24.5",
    "time1": 7.767,
    "time2": 11.822,
  }, {
    "title": "Phía trước đường cong xe tải đi đối diện làn xe khách",
    "total_time": "27.5",
    "time1": 13.314,
    "time2": 17.302,
  }, {
    "title": "Đường đèo dốc ban đêm gần đoạn đường cong, đột ngột tại khúc cua có xe khách lấn làn vượt xe tải lớn",
    "total_time": "37.2",
    "time1": 20.217,
    "time2": 25.019,
  }, {
    "title": "Xe của bạn đi phía sau xe tải chở vật liệu không được chằng buộc cẩn thận",
    "total_time": "22.4",
    "time1": 12.773,
    "time2": 16.360,
  }, {
    "title": "Xe oto phía trước phanh gấp do có động vật hoang dã đứng ven đường",
    "total_time": "33.3",
    "time1": 16.069,
    "time2": 20.187,
  }, {
    "title": "Đường núi sương mù có đàn bò đứng sát đường ngay đoạn đường cong",
    "total_time": "27.2",
    "time1": 14.211,
    "time2": 17.395,
  }, {
    "title": "Xe con vào cua lấn làn nguy hiểm va chạm với xe đi ngược chiều trên đồi núi",
    "total_time": "31.9",
    "time1": 17.995,
    "time2": 20.174,
  }, {
    "title": "Xe khách lấn làn vượt xe container ngay trên khúc cua trên đường đồi núi",
    "total_time": "52.4",
    "time1": 30.931,
    "time2": 35.543,
  }, {
    "title": "Đường núi trời mưa xe phía trước dừng lại đột ngột vì hỏng máy",
    "total_time": "32.7",
    "time1": 15.495,
    "time2": 19.720,
  }, {
    "title": "Xe tải lấn làn đường xe của bạn để vượt các xe khác trên đường núi thời tiết sương mù",
    "total_time": "30.8",
    "time1": 18.538,
    "time2": 22.977,
  }, {
    "title": "Xe con lấn làn xe bạn để vượt xe tải trên sườn núi ngay tại đoạn đường quanh co",
    "total_time": "31.3",
    "time1": 18.298,
    "time2": 21.142,
  }, {
    "title": "Xe oto phanh gấp phía trước để tránh đoàn xe đạp từ đường nhánh đi ra",
    "total_time": "32.2",
    "time1": 14.287,
    "time2": 18.538,
  }, {
    "title": "Trẻ em đột ngột lao ra để nhặt quả bóng lăn ra đường",
    "total_time": "26.8",
    "time1": 8.292,
    "time2": 11.283,
  }, {
    "title": "Em bé đột ngột chạy ra đường",
    "total_time": "26.8",
    "time1": 9.649,
    "time2": 13.092,
  }, {
    "title": "Xe con từ làn phải (khuất tầm nhìn), cắt ngang qua các xe khác để qua đường",
    "total_time": "26.2",
    "time1": 9.477,
    "time2": 13.249,
  }, {
    "title": "Đèn vừa chuyển xanh, đột ngột xe moto làn trái phía trước đèn đỏ cố vượt để cắt ngang làn xe",
    "total_time": "24.9",
    "time1": 14.652,
    "time2": 17.475,
  }, {
    "title": "Xe moto đi ra từ đường nhánh nguy hiểm phía sau xe buýt vừa đi",
    "total_time": "28.0",
    "time1": 12.756,
    "time2": 15.486,
  }, {
    "title": "Xe moto vượt lên đột ngột giảm tốc và chuyển sang làn xe của bạn để tránh chướng ngại vật bên đường",
    "total_time": "20.8",
    "time1": 9.718,
    "time2": 12.381,
  }, {
    "title": "Xe bán tải từ làn bên kia quay đầu đột ngột lấn làn xe của bạn",
    "total_time": "28.2",
    "time1": 18.472,
    "time2": 21.641,
  }, {
    "title": "Xe tải lớn ở làn ngược chiều lấn làn xe của bạn để vượt qua xe",
    "total_time": "29.5",
    "time1": 9.752,
    "time2": 14.759,
  }, {
    "title": "Xuất hiện gia súc đi ra từ vệ đường đi ra từ đầu đường quốc lộ trước mặt xe của bạn",
    "total_time": "24.7",
    "time1": 10.643,
    "time2": 13.462,
  }, {
    "title": "Xe con phía trước giảm tốc độ đột ngột và chuyển làn để tránh xe buýt đang dừng",
    "total_time": "25.8",
    "time1": 12.615,
    "time2": 16.292,
  }, {
    "title": "Khúc gỗ trên xe tải phía trước rơi xuống do xe tải phanh gấp",
    "total_time": "33.7",
    "time1": 19.464,
    "time2": 21.733,
  }, {
    "title": "Xe con phía trước giảm tốc độ và chuyển làn đột ngột để tránh chướng ngại vật",
    "total_time": "25.1",
    "time1": 7.640,
    "time2": 11.841,
  }, {
    "title": "Đi qua chỗ giao cắt với đường sắt ban đêm không có đèn tính hiệu phía sau xe con đột nhiên có tàu đi tới",
    "total_time": "28.5",
    "time1": 6.690,
    "time2": 11.390,
  }, {
    "title": "Xe oto phanh và chuyển làn tránh xe buýt vào trả khách",
    "total_time": "25.6",
    "time1": 14.610,
    "time2": 17.246,
  }, {
    "title": "Xe đạp từ bên kia đường đối diện băng qua đường không quan sát trước mặt xe của bạn",
    "total_time": "24.2",
    "time1": 11.811,
    "time2": 15.396,
  }, {
    "title": "Xe bán tải phía trước giảm tốc độ và chuyển làn khẩn cấp để tránh oto đi ngược chiều",
    "total_time": "23.3",
    "time1": 9.905,
    "time2": 13.828,
  }, {
    "title": "Xe inova lùi trên cao tốc Hà Nội - Thái Nguyên",
    "total_time": "25.4",
    "time1": 9.045,
    "time2": 13.490,
  }, {
    "title": "Xe moto lấn làn vượt ẩu trên đồi núi, va chạm với xe khách đi ngược chiều",
    "total_time": "19.5",
    "time1": 8.398,
    "time2": 11.663,
  }, {
    "title": "Xe con từ lan trong cùng bên trái lấn làn vượt ẩu để đi ra đường nhánh, va chạm với xe tải",
    "total_time": "31.2",
    "time1": 16.479,
    "time2": 19.608,
  }, {
    "title": "Xe tai nạn liên hoàn giữa ba xe khách do đâm vào xe đang dừng đỗ sữa chữa",
    "total_time": "35.3",
    "time1": 20.488,
    "time2": 24.516,
  }, {
    "title": "Tài xế giật mình đánh lái gấp đâm vào dải phân cách, đổ xe vào đám đông làm năm người thiệt mạng",
    "total_time": "22.1",
    "time1": 8.714,
    "time2": 13.469,
  }, {
    "title": "Xe container không làm chủ tốc độ đâm trực diện vào xe con đang dừng chờ ở đèn đỏ",
    "total_time": "27.6",
    "time1": 20.636,
    "time2": 23.937,
  }, {
    "title": "Xe khách vào cua với tốc độ cao, lấn sang đường ngược chiều va chạm với xe đi ngược chiều lại",
    "total_time": "42.3",
    "time1": 22.281,
    "time2": 25.014,
  }, {
    "title": "Tai nạn đèo pren xe khách mất lái đâm vào người điều tiết giao thông và xe khách đi ngược chiều",
    "total_time": "33.3",
    "time1": 16.846,
    "time2": 20.592,
  }, {
    "title": "Hầm hải vân xe kéo rơ móc mất lái lấn làn đâm trực diện vào xe tải đi ngược chiều lại gây tai nạn",
    "total_time": "32.4",
    "time1": 19.499,
    "time2": 22.530,
  }, {
    "title": "Xe oto con chở người đi qua đường sắt tại Nam Định không chú ý va chạm với tàu hoả",
    "total_time": "24.8",
    "time1": 11.219,
    "time2": 14.246,
  }, {
    "title": "Xe oto 16 chỗ chở khách rẻ trái qua đường sắt không chú ý va chạm với tàu hoả",
    "total_time": "30.6",
    "time1": 14.945,
    "time2": 17.261,
  }, {
    "title": "Xe khách va chạm với xe cứu hoả đi ngược chiều tại nút giao Pháp Vân",
    "total_time": "25.1",
    "time1": 15.270,
    "time2": 18.844,
  }, {
    "title": "Phía trước đột nhiên có xe oto từ làn đối diện đi ngược chiều va chạm với xe con",
    "total_time": "30.6",
    "time1": 19.527,
    "time2": 22.602,
  }, {
    "title": "Tại ngã tư Hàng Xanh lái xe oto con trong tình trạng có nồng độ cồn không làm chủ tốc độ đâm vào loạt xe đang dừng đèn đỏ",
    "total_time": "27.4",
    "time1": 22.300,
    "time2": 24.791,
  }, {
    "title": "Xe khách 45 chỗ đâm vào xe đầu kéo rơ móc chở máy ủi đi từ đường tránh ra xảy ra tai nạn thảm khóc",
    "total_time": "24.9",
    "time1": 13.788,
    "time2": 16.129,
  }, {
    "title": "Xe khách 48 chỗ thiếu kỹ năng điều khiển, không thông thuộc địa hình lao xuống vực tại Kon Tum",
    "total_time": "35.0",
    "time1": 19.411,
    "time2": 22.644,
  }, {
    "title": "Xe khách chạy vượt xe tải đâm trực diện vào xe khách đang đi ngược chiều gây tai nạn liên hoàn 3 xe",
    "total_time": "35.9",
    "time1": 15.051,
    "time2": 17.940,
  }, {
    "title": "Trời mưa đường trơn trợt xe tải vào cua không làm chủ tốc độ đã đam vào xe ben đi ngược chiều",
    "total_time": "31.1",
    "time1": 22.995,
    "time2": 25.241,
  }, {
    "title": "Xe 16 chỗ từ đường nhánh, khuất tầm nhìn không làm chủ tốc độ rẻ vào đường chính bị xe rơ móc đâm vào",
    "total_time": "25.2",
    "time1": 12.362,
    "time2": 15.490,
  }, {
    "title": "Xe container bất ngờ tông đột ngột vào xe đang dừng đèn đỏ tại quốc lộ 1",
    "total_time": "23.6",
    "time1": 12.205,
    "time2": 15.249,
  }, {
    "title": "Xe khách lấn làn vượt xe tải chỗ đường cong đâm vào xe khách đi ngược chiều",
    "total_time": "19.1",
    "time1": 11.565,
    "time2": 14.685,
  }, {
    "title": "Xe khách 16 chỗ vượt ẩu qua xe đầu kéo va chạm với xe khách đang tuột dốc tốc độ cao gây tai nạn liên hoàn giữa 3 xe",
    "total_time": "21.4",
    "time1": 7.257,
    "time2": 11.187,
  }, {
    "title": "Khi đèn tính hiệu chuyển sang xanh, đột ngột có xe con cố vượt từ đường giao bên trái sang làm va chạm với xe con",
    "total_time": "24.0",
    "time1": 16.891,
    "time2": 19.934,
  }, {
    "title": "Ô tô 7 chỗ đi trên cầu hẹp ban đêm, tài xế lái xe va chạm với xe máy, xe đâm xuống sống tại cầu treo",
    "total_time": "31.3",
    "time1": 12.154,
    "time2": 16.330,
  }, {
    "title": "Ban đêm xe con phanh gấp tránh xe máy từ ngõ lao ra xe khách không làm chủ được tốc độ từ ngõ lao ra đâm trực diện xe con",
    "total_time": "27.6",
    "time1": 11.997,
    "time2": 15.892,
  }, {
    "title": "Phía trước có đá lở đột ngột và rơi xuống",
    "total_time": "24.4",
    "time1": 10.560,
    "time2": 15.126,
  }, {
    "title": "Xe con phanh gấp tránh xe máy từ ngõ lao ra, xe khách không làm chủ được tốc độ đã đâm trực diện vào xe con",
    "total_time": "21.9",
    "time1": 10.937,
    "time2": 13.396,
  }, {
    "title": "Xe 16 chỗ rẽ không quan sát, không làm chủ tốc độ đâm vào xe bán tải đang lùi",
    "total_time": "24.1",
    "time1": 10.619,
    "time2": 15.473,
  }, {
    "title": "Xe khách không tuân thủ khoảng cách an toàn, xử lý tình huống không kịp dẫn tới va chạm với xe tải đang dừng đỗ",
    "total_time": "30.1",
    "time1": 11.921,
    "time2": 14.562,
  }, {
    "title": "Xe tải không làm chủ được tốc độ mất lái lao vào chợ dân sinh và va chạm với các xe đang đi phía trước",
    "total_time": "34.4",
    "time1": 13.733,
    "time2": 16.389,
  }
];

const chapters = [
  { title: 'Trên đường đô thị', start: 1, end: 29 },
  { title: 'Trên đường nông thôn', start: 30, end: 43 },
  { title: 'Trên đường cao tốc', start: 44, end: 63 },
  { title: 'Trên đường núi', start: 64, end: 73 },
  { title: 'Trên đường quốc lộ', start: 74, end: 90 },
  { title: 'Tình huống tai nạn', start: 91, end: 120 },
]

const getVideo = idx => `https://taplai.net/videos/${idx}.mp4`

const getTimeStamp = () => new Date().getTime()

const formatTime = (time = 0, fixed = 3) => +(time).toFixed(fixed)

const getStep = ({ time1 = 0, time2 = 0 }) => formatTime((time2 - time1) / RANGE)

const getResultRange = (data = {}) => {
  const { time1 = 0, time2 = 0 } = data || {}

  const step = getStep({ time1, time2 })

  return [...Array(RANGE)].reduce((acc) => {
    const { start: lastStart } = acc?.[acc?.length - 1] || {}
    const start = formatTime(lastStart ? lastStart + step : time1)

    return ([...acc, { start, end: formatTime(start + step) }])
  }, [])
}

const RANGE = 5;

const Control = ({
  isPlay = false,
  disablePlay = false,
  disableReplay = false,
  onPlay = null,
  onReplay = null,
  time = {},
}) => {
  const [timer, setTimer] = useState(0)

  const intervalRef = useRef();
  const timerRef = useRef(0);

  const updateTimer = (num = 0) => {
    timerRef.current = num;
    setTimer(num);
  }

  useEffect(() => {
    const intervalTime = 133

    if (isPlay) {
      updateTimer(0);
      intervalRef?.current && clearInterval(intervalRef.current)
    } else {
      intervalRef.current = setInterval(() => {
        const nextTimer = formatTime(Math.min(time?.duration, timerRef.current + (intervalTime / 1000)));
        if (nextTimer <= time?.duration) {
          updateTimer(nextTimer);
        } else {
          clearInterval(intervalRef.current)
        }
      }, intervalTime);
    }
  }, [isPlay]);

  return (
    <>
      <div className='timer' style={{ width: `${timer * 100 / time?.duration}%` }} />
      <div className='control'>
        <div className='control-btn'>
          {isPlay
            ? (
              <Button
                shape="default"
                size='large'
                icon={<PlayCircleOutlined />}
                onClick={onPlay}
                disabled={disablePlay}
              />
            ) : (
              <Button
                shape="default"
                size='large'
                icon={<UndoOutlined />}
                onClick={onReplay}
                disabled={disableReplay}
              />
            )
          }
        </div>
        {time?.duration > 0 && (
          <div className='control-time'>
            <span className='control-time-data'>{timer}</span>
            <span className='control-time-duration'>{time.duration}</span>
          </div>
        )}
      </div>
    </>
  )
}

const Simulation = () => {
  const [question, setQuestion] = useState(1)
  const [resultRange, setResultRange] = useState([])

  const [isPlay, setIsPlay] = useState(true)
  const [time, setTime] = useState({ duration: 0, start: 0, pause: 0 })
  const [result, setResult] = useState({})

  const videoRef = useRef(null);

  const questionInfo = questions?.[question - 1]
  const questionResult = result?.[question]
  const resultStep = getStep(questionInfo)

  const isPlaying = time?.start > 0
  const isValidVideo = time?.duration > 0;

  const disablePlay = !isValidVideo;
  const disableReplay = !isValidVideo;
  const disableSpace = !isValidVideo || !isPlaying || isNumber(questionResult?.time);
  const disablePrev = !isValidVideo || question <= 1;
  const disableNext = !isValidVideo || question >= questions?.length;

  const onPlay = () => {
    // if (isPlay) {
    time?.start === 0 && setTime({ duration: formatTime(videoRef?.current?.duration), start: getTimeStamp(), pause: 0 })
    setResult((prev) => ({ ...prev, [question]: null }))
    videoRef?.current?.play();
    // } else {
    //   setTime(prev => ({ ...prev, pause: getTimeStamp() }))
    //   videoRef?.current?.pause()
    // }
    setIsPlay(prev => !prev);
  }

  const onReplay = () => {
    setIsPlay(true);
    setTime(prev => ({ ...prev, start: 0, pause: 0 }))
    setResult((prev) => ({ ...prev, [question]: null }))

    videoRef?.current?.pause()
    videoRef.current.currentTime = 0;
  }

  const onPrevious = () => {
    question > 1 && setQuestion(prev => prev - 1);
  }

  const onNext = () => {
    question < questions?.length && setQuestion(prev => prev + 1);
  }

  const onSpace = () => {
    const resultTime = (getTimeStamp() - time?.start) / 1000;
    const resultRangeIdx = resultRange.findIndex(item => resultTime >= item?.start && resultTime <= item?.end);

    setResult(prev => ({
      ...prev,
      [question]: {
        time: resultTime,
        point: resultRangeIdx >= 0 ? resultRangeIdx + 1 : 0
      }
    }));
  }

  const onSuggest = () => {
    // TODO
  }

  useEffect(() => {
    setIsPlay(true);
    setTime({ duration: 0, start: 0, pause: 0 });
    setResultRange(getResultRange(questionInfo))
  }, [question])

  const totalScore = Object.values(result).reduce((acc, curr) => acc + (curr?.point || 0), 0)

  return (
    <div className='simulation-page'>
      <div key={questionInfo?.title} className='content-left'>
        <div className='title'>
          Câu {question}: {questions?.[question - 1]?.title}
        </div>
        <video
          ref={videoRef}
          // poster="https://taplai.com/img/banner-hoc-120-tinh-huong-mo-phong.png"
          onLoadedData={e => setTime(prev => ({ ...prev, duration: formatTime(e?.target?.duration) }))}
        >
          <source src={getVideo(question)} type="video/mp4" />
        </video>
        {isValidVideo && questionResult && (
          <div className='result-range'>
            <div
              className='result-range-content'
              style={{
                width: `${formatTime((resultStep * 100) / time?.duration) * RANGE}%`,
                left: `${questionInfo?.time1 * 100 / time?.duration}%`
              }}
            >
              {[...Array(RANGE)].map((_, idx) => <div key={idx} />)}
            </div>
            <img
              className='result-range-flag'
              src={IMG_FLAG}
              alt=''
              style={{ left: `${questionResult?.time * 100 / time?.duration}%` }}
            />
          </div>
        )}
        <Control
          isPlay={isPlay}
          disablePlay={disablePlay}
          disableReplay={disableReplay}
          onPlay={onPlay}
          onReplay={onReplay}
          time={time}
          question={questionInfo}
        />
        {isValidVideo && questionResult && (
          <div className='result-score'>
            <div className='result-score-time'>
              Thời gian: {questionResult?.time}s
            </div>
            <div className='result-score-point'>
              Điểm: <span>{questionResult?.point}</span>
            </div>
            <Button
              shape="primary"
              size='medium'
              icon={<InfoCircleOutlined />}
              iconPosition='start'
              onClick={onSuggest}
              disabled
            >
              Gợi ý
            </Button>
          </div>
        )}
        <div className='action'>
          <Button
            shape="default"
            size='large'
            icon={!disablePrev && <LeftOutlined />}
            iconPosition='start'
            onClick={onPrevious}
            disabled={disablePrev}
          >
            {disablePrev ? '-' : `Câu ${question - 1}`}
          </Button>
          <Button
            className='space-btn'
            shape="primary"
            size='large'
            onClick={onSpace}
            disabled={disableSpace}
          >
            SPACE
          </Button>
          <Button
            shape="default"
            size='large'
            icon={!disableNext && <RightOutlined />}
            iconPosition='end'
            onClick={onNext}
            disabled={disableNext}
          >
            {disableNext ? '-' : `Câu ${question + 1}`}
          </Button>
        </div>
        <p>đáp án đúng từ giây {formatTime(+questionInfo.time1)} đến giây {formatTime(+questionInfo.time2)}</p>
      </div>
      <div className='content-right'>
        <p className='total-score'>
          Tổng điểm: <span>{totalScore}</span>
        </p>
        <div className='question'>
          {questions.map((_, idx) => {
            const qIdx = idx + 1;
            const qResult = result?.[qIdx];
            const chapIdx = chapters?.findIndex(c => qIdx === c?.start)
            const chap = chapters?.[chapIdx]
            return (
              <>
                {chap && (
                  <div key={chap?.title} className='chapter-item'>
                    Chương {chapIdx + 1}: {chap?.title}
                  </div>
                )}
                <div
                  key={idx}
                  className={clsx(
                    'question-item',
                    qResult ? 'answered' : qIdx === question ? 'active' : 'not-start'
                  )}
                  onClick={() => setQuestion(qIdx)}
                >
                  Câu {qIdx}
                  {qResult && <span>{qResult?.point}</span>}
                </div>
              </>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Simulation