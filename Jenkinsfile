pipeline {
  agent any
  stages {
    stage('Checkout Integration') {
      steps {
        git(url: 'http://git-pd.beinformed.com/PD/com.beinformed.continuous.integration', branch: 'master', credentialsId: 'beinformed_git')
      }
    }

    stage('Checkout Tests') {
      steps {
        git(url: 'http://git-pd.beinformed.com/PD/com.beinformed.ams.core.git', branch: 'develop', credentialsId: 'beinformed_git')
      }
    }

  }
}