pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
        disableRestartFromStage()
    }
    tools {
        nodejs "nodejs"
    }
    stages {
        stage('install') {
            when {
                anyOf{
                    expression{env.BRANCH_NAME == 'deploy'}
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('create-env-dev') {
            when {
                branch 'deploy'
            }
            environment {
                TJ_API_DEV_PORT = credentials("TJ_API_DEV_PORT")
                BRANCH_NAME = '${env.BRANCH_NAME}'
            }
            steps {
                echo 'Creating Enviorment varibles : '+env.BRANCH_NAME
                sh '''#!/bin/bash
                touch .env
                echo PORT=$TJ_API_DEV_PORT >> .env
                sed -i 's/environment/qa/g' ecosystem.config.js
                '''
            }
        }

        stage('deploy-dev') {
            when {
                branch 'deploy'
            }
            environment {
            }
            steps {
                echo 'deploying the software'
                sh '''#!/bin/bash
                    pm2 stop ecosystem.config.js && pm2 start ecosystem.config.js && pm2 save
                '''
            }
        }
    }
}