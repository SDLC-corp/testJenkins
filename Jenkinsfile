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
                    expression{env.BRANCH_NAME == 'dev'}
                    expression{env.BRANCH_NAME == 'prod'}
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('create-env-dev') {
            when {
                branch 'dev'
            }
            environment {
                TJ_API_DEV_PORT = credentials("TJ_API_DEV_PORT")
                BRANCH_NAME = '${env.BRANCH_NAME}'
            }
            steps {
                echo 'Creating Enviorment varibles : '+env.BRANCH_NAME
                sh '''#!/bin/bash
                rm .env
                touch .env
                echo PORT=$TJ_API_DEV_PORT >> .env
                '''
            }
        }

        stage('dev-dev') {
            when {
                branch 'dev'
            }
            steps {
                echo 'deploying the software'
                sh '''#!/bin/bash
                    pm2 stop ecosystem.config.js && pm2 start ecosystem.config.js && pm2 save
                '''
            }
        }


        stage('create-env-prod') {
            when {
                branch 'prod'
            }
            environment {
                TJ_API_PROD_PORT = credentials("TJ_API_PROD_PORT")
                BRANCH_NAME = '${env.BRANCH_NAME}'
            }
            steps {
                echo 'Creating Enviorment varibles : '+env.BRANCH_NAME
                sh '''#!/bin/bash
                rm .env
                touch .env
                echo PORT=$TJ_API_PROD_PORT >> .env
                '''
            }
        }

        stage('dev-prod') {
            when {
                branch 'prod'
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