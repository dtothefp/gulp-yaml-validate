'use strict';

import 'should';
import yaml from'../';
import gutil, {File} from 'gulp-util';
import es from 'event-stream';
import fs from 'fs';
import path from 'path';

describe('gulp-yaml-validate', () => {

    // Test files
    var emptyFile,
        unsafeFile,
        validFile,
        invalidFile,
        nullFile,
        htmlFile;


    describe('in buffer mode', () => {

        beforeEach(() => {
            emptyFile = new File({
                path: 'test/empty.yml',
                cwd: 'test',
                contents: new Buffer('')
            });
            unsafeFile = new File({
                path: 'test/unsafe.yml',
                cwd: 'test',
                contents: fs.readFileSync('test/unsafe.yml')
            });
            validFile = new File({
                path: 'test/valid.yml',
                cwd: 'test',
                contents: fs.readFileSync('test/valid.yml')
            });
            invalidFile = new File({
                path: 'test/invalid.yml',
                cwd: 'test',
                contents: fs.readFileSync('test/invalid.yml')
            });
            htmlFile = new File({
                path: 'test/html.yml',
                cwd: 'test',
                contents: fs.readFileSync('test/html.yml')
            });
            nullFile = new File({
                cwd: 'test',
                contents: null
            });
        });

        it('should convert to json', (done) => {
            var stream = yaml();

            stream.once('data', (file) => {
                file.contents.toString('utf8').should.equal('{"root":{"key":"value"}}');
                path.extname(file.path).should.equal('.json');
                done();
            });

            stream.write(validFile);
            stream.end();
        });

        it('should convert to json', (done) => {
            var stream = yaml();

            stream.once('data', (file) => {
                file.contents.toString('utf8').should.equal('{"root":{"key":"value"}}');
                path.extname(file.path).should.equal('.json');
                done();
            });

            stream.write(validFile);
            stream.end();
        });

        it('should do nothing when contents is null', (done) => {
            var stream = yaml();

            stream.once('data', (file) => {
                file.isNull().should.equal(true);
                path.extname(file.path).should.equal('');
                done();
            });

            stream.write(nullFile);
            stream.end();
        });

        it('should throw if empty file', (done) => {
            var stream = yaml();

            stream.once('error', (error) => {
                error.message.should.equal('File ' + path.dirname(emptyFile.path) +
                ' is empty');
                done();
            });

            stream.write(emptyFile);
            stream.end();
        });

        it('should throw if not well formatted', (done) => {
            var stream = yaml();

            stream.once('error', (error) => {
                done();
            });

            stream.write(invalidFile);
            stream.end();
        });

        it('should throw if loading untrusted document with safe option enabled', (done) => {
            var stream = yaml({safe: true});

            stream.once('error', (/*error*/) => {
                done();
            });

            stream.write(unsafeFile);
            stream.end();
        });

        it('should throw if loading html content with `html` option enabled', (done) => {
            var stream = yaml({html: true});

            stream.once('error', (/*error*/) => {
                done();
            });

            stream.write(htmlFile);
            stream.end();
        });
    });

    describe('in stream mode', () => {

        beforeEach(() => {
            emptyFile = new gutil.File({
                path: 'test/empty.yml',
                cwd: 'test',
                contents: fs.createReadStream('test/empty.yml')
            });
            unsafeFile = new File({
                path: 'test/unsafe.yml',
                cwd: 'test',
                contents: fs.createReadStream('test/unsafe.yml')
            });
            validFile = new File({
                path: 'test/valid.yml',
                cwd: 'test',
                contents: fs.createReadStream('test/valid.yml')
            });
            invalidFile = new File({
                path: 'test/invalid.yml',
                cwd: 'test',
                contents: fs.createReadStream('test/invalid.yml')
            });
            htmlFile = new File({
                path: 'test/html.yml',
                cwd: 'test',
                contents: fs.createReadStream('test/html.yml')
            });
        });

        it('should convert to json', (done) => {
            var stream = yaml();

            stream.once('data', (file) => {
                file.contents.pipe(es.wait((err, data) => {
                    data.toString('utf8').should.equal('{"root":{"key":"value"}}');
                    path.extname(file.path).should.equal('.json');
                    done();
                }));
            });

            stream.write(validFile);
            stream.end();
        });

        it('should do nothing when contents is null', (done) => {
            var stream = yaml();

            stream.once('data', (file) => {
                file.isNull().should.equal(true);
                path.extname(file.path).should.equal('');
                done();
            });

            stream.write(nullFile);
            stream.end();
        });

        it('should throw if empty file', (done) => {
            var stream = yaml();

            stream.once('error', (error) => {
                error.message.should.equal('File ' + path.dirname(emptyFile.path) +
                ' is empty');
                done();
            });

            stream.write(emptyFile);
            stream.end();
        });

        it('should throw if not well formatted', (done) => {
            var stream = yaml();

            stream.once('error', (error) => {
                done();
            });

            stream.write(invalidFile);
            stream.end();
        });

        it('should throw if loading untrusted document with safe option enabled', (done) => {
            var stream = yaml({safe: true});

            stream.once('error', (/*error*/) => {
                done();
            });

            stream.write(unsafeFile);
            stream.end();
        });

        it('should throw if loading html content with `html` option enabled', (done) => {
            var stream = yaml({html: true});

            stream.once('error', (/*error*/) => {
                done();
            });

            stream.write(htmlFile);
            stream.end();
        });
    });

});
