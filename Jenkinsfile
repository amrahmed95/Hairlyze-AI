pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS', type: 'NodeJSInstallation'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from the repository
                git 'https://github.com/amrahmed95/Hairlyze-AI.git'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            // Install frontend dependencies
                            sh "${NODEJS_HOME}/bin/npm install"
                        }
                    }
                }
                stage('Install Backend Dependencies') {
                    steps {
                        dir('backend') {
                            // Install backend dependencies
                            sh "${NODEJS_HOME}/bin/npm install"
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {
                stage('Test Frontend') {
                    steps {
                        dir('frontend') {
                            // Run frontend tests
                            sh "${NODEJS_HOME}/bin/npm test"
                        }
                    }
                }
                stage('Test Backend') {
                    steps {
                        dir('backend') {
                            // Run backend tests
                            sh "${NODEJS_HOME}/bin/npm test"
                        }
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            // Build frontend using Vite
                            sh "${NODEJS_HOME}/bin/npm run build"
                        }
                    }
                }
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            // Build backend (if applicable)
                            // sh "${NODEJS_HOME}/bin/npm run build" // Uncomment if you have a build step
                        }
                    }
                }
            }
        }

        stage('Run Backend Server') {
            steps {
                dir('backend') {
                    // Run the backend server
                    // This will run the server in the background
                    sh "${NODEJS_HOME}/bin/npm start &"
                }
            }
        }

        stage('Run Frontend Development Server') {
            steps {
                dir('frontend') {
                    // Run the frontend development server
                    // This will run the server in the background
                    sh "${NODEJS_HOME}/bin/npm run dev &"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy your application
                // This could be a script to deploy to a server, cloud service, etc.
                echo 'Deploying application...'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}