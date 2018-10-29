FROM ubuntu:16.04
MAINTAINER Zachary Zwiesler <zackzwiesler@gmail.com>

# install ubuntu packages.
RUN DEBIAN_FRONTEND=noninteractive apt-get update --fix-missing && apt-get install -y \
    build-essential \
    autoconf \
    libtool \
    pkg-config \
    python \
    python-dev \
    python-setuptools \
    python-pip \
    libapache2-mod-wsgi \
    nano \
    ca-certificates \
    tzdata \
 && apt-get clean \
 && apt-get autoremove \
 && rm -rf /var/lib/apt/lists/*

# copy over and install the requirements
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# set the timezone. enable nano
RUN echo "America/New_York" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
ENV TERM xterm

# copy application
COPY ./data /data
COPY ./src /src
COPY ./app.py /app.py

WORKDIR /
