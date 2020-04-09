class ApiNetwork {
    constructor(name, ip) {
        this.name = name;
        this.ip = ip;
    }

    getUrl() {
        return `https://${this.ip}:8080`;
    }
}

const aws = new ApiNetwork('Aws', "84.12.12.14");
console.log(aws.getUrl());
