## Lab 04 - FHC and Local Development

### Instructions

1. Install Git by following these instructions:
  https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2. Install NodeJS runtime and *npm*.

  **Mac OSX**

    Download the .pkg from https://nodejs.org/download/ and install. Alternatively you can use *Homebrew* package manager:

    ```shell
    brew install node
    ```

  **Fedora**

    ```shell
    yum -y install nodejs npm
    ```

  **RHEL**

    ```shell
    rpm -Uvh http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
    yum -y install nodejs npm
    ```

3. Install FHC (FeedHenry Command Line Interface):

  ```shell
  npm install -g fh-fhc
  ```

  On Linux you would need to run this command as root. Verify that *fhc* is installed successfully.

  ```shell
  fhc help
  ```

  You can fine more info on *fhc* configuration (e.g. command completion) in FeedHenry docs:
  http://docs.feedhenry.com/v3/dev_tools/local/install.html

6. Install *Grunt*. *Grunt* is a task runner used for automation in JavaScript projects the same way Ant and Maven are used in Java projects.

  ```shell
  sudo npm install -g grunt-cli
  ```

4. In order to get started, you need to set the target FeedHenry platform and login.

  ```shell
  fhc target https://yourdomain.feedhenry.com
  fhc login [email] [password]
  ```

  List projects to verify login has been successful:

  ```shell
  fhc projects
  ```

5. Upload your SSH Public Key to FeedHenry in order to be able to work with the git repositories. If you don't already have an SSH key-pair, generate a pair run the following command and confirm the key location and passphrase:
  ```shell
  ssh-keygen -t rsa -C "your_email_address@example.com"
  ```

  Using FHC, you can upload your public key to FeedHenry:

  ```shell
  fhc keys ssh add myKey ~/.ssh/id_rsa.pub
  ```

  Verify the key is added by listing the uploaded SSH keys:

  ```shell
  fhc keys ssh
  ```  

  Managing the SSH keys can also be done in the user **Settings** in **FeedHenry Studio**.

6. Find the id of the project you created in the previous lab by running ```fhc projects | grep [project name]``` and clone that into your local environment.

  ```shell
  fhc projects clone [project id]
  ```
  The above command clones all apps within the project into your local environment.

7. Run the cloud server locally by running Grunt in the root directory of the app. Before that we need to install all required NodeJS dependencies (takes a few min the first time):

  ```shell
  npm install
  ```

  Now you can start a local NodeJS server.

  ```shell
  grunt serve
  ```

8. Verify the local cloud app server works by pointing your browser to http://localhost:8001/hello?hello=FeedHenry

9. Running the client app locally is done similar to the above.

  ```shell
  npm install
  grunt serve:local
  ```

10. Verify the client app works locally by pointing your browser to http://localhost:9002/?url=http://localhost:8001
