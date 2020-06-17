pipeline {
  agent {
    node {
      label 'q7-ref'
    }

  }
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

    stage('Do test') {
      parallel {
        stage('Do test') {
          steps {
            withAnt(installation: 'Ant Latest')
          }
        }

        stage('test') {
          steps {
            echo 'hello'
          }
        }

      }
    }

    stage('retreater') {
      steps {
        build(job: 'abet', propagate: true, quietPeriod: 23)
      }
    }

  }
}