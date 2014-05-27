var winston = require('winston');

//winston.log('info', 'Hello distru log files!');
//winston.info('Helloddddd logs');

//winston.log('info', 'TestLog Message', {anything : 'This is metadata'});

// winston.Logger 객체를 생성
var logger = new (winston.Logger)({
    // 아래에서 설명할 여러개의 transport를 추가할 수 있다.
    transports: [
        // Console transport 추가
        new (winston.transports.Console)(),
        // File transport 추가
        new (winston.transports.File)({
            // filename property 지정
            filename: 'somefile.log'
        })
    ]
});
// 생성한 객체를 사용하여 일반적인 방법과 동일하게 사용
logger.log('info', 'Hello distributed log files!');
logger.info('Hello again distributed logs');