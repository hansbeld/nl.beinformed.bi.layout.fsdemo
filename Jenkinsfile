pipeline {
  agent any
  stages {
    stage('run tests') {
      steps {
        git(url: 'http://git-pd.beinformed.com/PD/com.beinformed.continuous.integration', branch: 'master', credentialsId: 'beinformed_git')
      }
    }

  }
}