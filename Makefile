all: manualjunkaction.xpi

manualjunkaction.xpi:
	make -f Makefile.chrome -C chrome manualjunkaction.jar
	rm -f $@
	zip $@ chrome/manualjunkaction.jar install.rdf license.txt chrome.manifest

babelzilla:
	make -f Makefile.chrome -C chrome babelzilla
	rm -rf manualjunkaction.xpi
	zip manualjunkaction.xpi chrome/manualjunkaction.jar install.rdf license.txt chrome.manifest

clean:
	rm -f chrome/manualjunkaction.jar manualjunkaction.xpi
