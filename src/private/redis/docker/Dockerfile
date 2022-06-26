FROM alpine:3.10
RUN apk add -U git ffmpeg-dev jpeg-dev libpng-dev libsndfile-dev libsamplerate-dev tiff-dev g++ make cmake
WORKDIR /build
RUN git clone https://github.com/aetilius/pHash
# Build fix on Alpine
RUN sed 's|#include <sys/sysctl.h>||g' ./pHash/src/pHash.h.cmake > ./pHash/src/pHash.h.cmake.tmp && mv ./pHash/src/pHash.h.cmake.tmp ./pHash/src/pHash.h.cmake

WORKDIR /build/build
RUN cmake -DWITH_AUDIO_HASH=ON -DWITH_VIDEO_HASH=ON /build/pHash
RUN make -j8
RUN make install

FROM alpine:3.10
COPY --from=builder /usr/local/lib/libpHash.so.1.0.0 /usr/local/lib/libpHash.so.1.0.0
COPY --from=builder /usr/local/lib/libpHash.so /usr/local/lib/libpHash.so
COPY --from=builder /usr/local/include/pHash.h /usr/local/include/pHash.h
RUN apk add -U ffmpeg jpeg libpng libsndfile libsamplerate tiff
